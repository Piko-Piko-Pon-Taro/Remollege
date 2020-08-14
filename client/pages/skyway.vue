<template>
  <section class="container">
    <div>
      <div id="videos-container">
        <video id="my-video" :width="videoWidth" muted autoplay></video>
      </div>

      <div class="main">
        <h2>ビデオチャット</h2>
        マイク:
        <select v-model="selectedAudio" @change="onChange">
          <option disabled value="">Please select one</option>
          <option
            v-for="(audio, key, index) in audios"
            v-bind:key="index"
            :value="audio.value"
          >
            {{ audio.text }}
          </option>
        </select>

        カメラ:
        <select v-model="selectedVideo" @change="onChange">
          <option disabled value="">Please select one</option>
          <option
            v-for="(video, key, index) in videos"
            v-bind:key="index"
            :value="video.value"
          >
            {{ video.text }}
          </option>
        </select>

        <div>
          <p>
            Your id: <span id="my-id">{{ peerId }}</span>
          </p>
          <p>
            Connected id:
            <span id="connected-peer-id">{{ connectedPeerId }}</span>
          </p>
          <h3>コールする</h3>
          <input v-model="calltoid" placeholder="call id" />
          <button id="end-call" v-if="isTalking" @click="endCall">End</button>
          <button id="make-call" v-else @click="makeCall">Call</button>
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
      audios: [],
      videos: [],
      videoWidth: 200,
      localStream: null,
      peerId: '',
      connectedPeerId: '',
      calltoid: '',
      existingCall: null,
      isTalking: false
    }
  },
  mounted() {
    // デバイスへのアクセス

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {})
      .catch((err) => {
        console.error('mediaDevice.getUserMedia() error:', err)
      })

    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i]
        if (deviceInfo.kind === 'audioinput') {
          this.audios.push({
            text: deviceInfo.label || `Microphone ${this.audios.length + 1}`,
            value: deviceInfo.deviceId
          })
        } else if (deviceInfo.kind === 'videoinput') {
          this.videos.push({
            text: deviceInfo.label || `Camera  ${this.videos.length - 1}`,
            value: deviceInfo.deviceId
          })
        }
      }
    })

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

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      document.getElementById('my-video').srcObject = stream
      document.getElementById('my-video').play()
      this.localStream = stream
    },

    makeCall() {
      const call = this.peer.call(this.calltoid, this.localStream)
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

      call.on('stream', (stream) => {
        this.addVideo(call, stream)
        this.setupEndCallUI()
        this.connectedPeerId = call.remoteId
      })

      call.on('close', () => {
        this.removeVideo(call.remoteId)
        this.setupMakeCallUI()
      })
    },
    addVideo(call, stream) {
      const videoDom = document.createElement('video')
      videoDom.setAttribute('id', call.remoteId)
      videoDom.setAttribute('width', this.videoWidth)
      videoDom.autoplay = true
      videoDom.srcObject = stream
      document.getElementById('videos-container').append(videoDom)
    },
    removeVideo(peerId) {
      document.getElementById(peerId).remove()
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
