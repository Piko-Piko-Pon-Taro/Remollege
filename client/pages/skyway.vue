<template>
  <section class="container">
    <div>
      <div id="videos-container">
        <video
          id="my-video"
          :width="videoWidth"
          :height="videoHeight"
          muted
          autoplay
        />
        <video
          v-for="peerStream in peerStreams"
          :id="peerStream.peerId"
          :key="peerStream.peerId"
          :width="videoWidth"
          :height="videoHeight"
          :srcObject.prop="peerStream"
          class="peer-video"
          autoplay
        />
      </div>

      <div class="main">
        <h2>ビデオチャット</h2>
        マイク:
        <select v-model="selectedAudio" @change="onChange">
          <option disabled value>Please select one</option>
          <option
            v-for="(audio, key, index) in audioDevices"
            :key="index"
            :value="audio.value"
            >{{ audio.text }}</option
          >
        </select>
        カメラ:
        <select v-model="selectedVideo" @change="onChange">
          <option disabled value>Please select one</option>
          <option
            v-for="(video, key, index) in videoDevices"
            :key="index"
            :value="video.value"
            >{{ video.text }}</option
          >
        </select>

        <div>
          <p>
            Your id:
            <span id="my-id">{{ peerId }}</span>
          </p>
          <p>
            Connected room id:
            <span id="connected-room-id">{{ connectedRoomId }}</span>
          </p>
          <h3>部屋に参加する</h3>
          <input v-model="roomId" placeholder="room id" />
          <button id="end-call" v-if="isTalking" @click="endCall">Leave</button>
          <button id="make-call" v-else @click="makeCall">Join</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let Peer
if (process.client) {
  Peer = require('skyway-js')
}

export default {
  data() {
    return {
      APIKey: process.env.SKYWAY_API_KEY,
      selectedAudio: '',
      selectedVideo: '',
      audioDevices: [],
      videoDevices: [],
      videoWidth: 320,
      videoHeight: 240,
      peerStreams: [],
      localStream: null,
      peerId: '',
      connectedRoomId: '',
      roomId: '',
      existingCall: null,
      isTalking: false
    }
  },
  mounted() {
    // 利用可能デバイスの取得
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() =>
        navigator.mediaDevices
          .enumerateDevices()
          .then((deviceInfos) => {
            for (let i = 0; i !== deviceInfos.length; ++i) {
              const deviceInfo = deviceInfos[i]
              if (deviceInfo.kind === 'audioinput') {
                this.audioDevices.push({
                  text:
                    deviceInfo.label ||
                    `Microphone ${this.audioDevices.length}`,
                  value: deviceInfo.deviceId
                })
              } else if (deviceInfo.kind === 'videoinput') {
                this.videoDevices.push({
                  text:
                    deviceInfo.label || `Camera  ${this.videoDevices.length}`,
                  value: deviceInfo.deviceId
                })
              }
            }
          })
          .catch(function(error) {
            console.error('mediaDevices.enumerateDevices() error:', error)
          })
      )
      .catch((err) => alert(`${err.name} ${err.message}`))

    this.peer = new Peer({
      key: this.APIKey,
      debug: 3
    })

    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })

    this.peer.on('call', (call) => {
      call.answer(this.localStream)
      this.setupCallEventHandlers(call)
    })

    this.peer.on('error', (err) => {
      alert(err.message)
    })
  },

  methods: {
    onChange() {
      if (this.selectedAudio !== '' && this.selectedVideo !== '') {
        this.connectLocalCamera()
      }
    },

    async connectLocalCamera() {
      const constraints = {
        audio: this.selectedAudio
          ? { deviceId: { exact: this.selectedAudio } }
          : false,
        video: this.selectedVideo
          ? { deviceId: { exact: this.selectedVideo } }
          : false
      }
      if (constraints.video) {
        constraints.video.width = {
          min: this.videoWidth,
          max: this.videoWidth
        }
        constraints.video.height = {
          min: this.videoHeight,
          max: this.videoHeight
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      document.getElementById('my-video').srcObject = stream
      this.localStream = stream
    },

    makeCall() {
      if (!this.roomId) {
        return
      }
      const call = this.peer.joinRoom(this.roomId, {
        mode: 'sfu',
        stream: this.localStream
      })
      this.setupCallEventHandlers(call)
    },
    endCall() {
      this.existingCall.close()
    },

    setupCallEventHandlers(call) {
      if (this.existingCall) {
        this.existingCall.close()
      }

      this.existingCall = call
      this.setupEndCallUI()
      this.connectedRoomId = call.name

      call.on('stream', (stream) => {
        this.addVideo(stream)
      })

      call.on('peerLeave', (peerId) => {
        this.removeVideo(peerId)
      })

      // 自分が部屋を抜けた時
      call.on('close', () => {
        this.removeAllVideos()
        this.setupMakeCallUI()
      })
    },

    addVideo(stream) {
      this.peerStreams.push(stream)
    },

    removeVideo(peerId) {
      this.peerStreams.some((v, i) => {
        if (v.peerId === peerId) this.peerStreams.splice(i, 1)
      })
    },

    removeAllVideos() {
      this.peerStreams = []
    },

    setupMakeCallUI() {
      this.isTalking = false
    },

    setupEndCallUI() {
      this.isTalking = true
    }
  }
}
</script>
