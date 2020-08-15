<template>
  <v-card :color="$const.MAIN_COLOR" class="mx-auto" dark>
    <div id="videos-container">
      <VideoCard
        v-if="localStream"
        :id="'self'"
        :videoWidth="videoWidth"
        :videoHeight="videoHeight"
        :name="user.name"
        :stream="localStream"
        :muted="true"
      />
      <VideoCard
        v-for="peerStream in peerStreams"
        :id="peerStream.peerId"
        :width="videoWidth"
        :height="videoHeight"
        :stream="peerStream"
        :muted="false"
      />
    </div>

    <div class="UI">
      <p>ルーム名:{{ getCurrentRoom }}</p>
      マイク:
      <v-select
        v-model="selectedAudio"
        @change="onChange"
        :items="audioDevices"
        :background-color="$const.ACCENT_COLOR"
        label="Select Audio"
        solo
      ></v-select>
      カメラ:
      <v-select
        v-model="selectedVideo"
        @change="onChange"
        :items="videoDevices"
        :background-color="$const.ACCENT_COLOR"
        label="Select Camera"
        solo
      ></v-select>

      <div>
        <template v-if="isTalking">
          <button id="end-call" @click="endCall">Leave</button>

          <button v-if="isMute" @click="toggleMute">unmute</button>
          <button v-else @click="toggleMute">mute</button>

          <button v-if="isCamOn" @click="toggleCamera">
            turn camera off
          </button>
          <button v-else @click="toggleCamera">turn camera on</button>
        </template>
      </div>
    </div>
  </v-card>
</template>

<script>
let Peer
if (process.client) {
  Peer = require('skyway-js')
}
export default {
  components: {
    VideoCard: () => import('@/components/organisms/VideoCard')
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    roomId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      APIKey: process.env.SKYWAY_API_KEY,
      selectedAudio: '',
      selectedVideo: '',
      audioDevices: [],
      videoDevices: [],
      videoWidth: 280,
      videoHeight: 240,
      peerStreams: [],
      localStream: null,
      peerId: '',
      connectedRoomId: '',
      existingCall: null,
      isTalking: false,
      isMute: false,
      isCamOn: true
    }
  },
  computed: {
    getCurrentRoom() {
      if (this.roomId) {
        this.makeCall()
      } else if (this.existingCall) {
        this.endCall()
      }
      return this.roomId
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
    },

    toggleMute() {
      if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0]
        audioTrack.enabled = !audioTrack.enabled
        this.isMute = !audioTrack.enabled
      }
    },
    toggleCamera() {
      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0]
        videoTrack.enabled = !videoTrack.enabled
        this.isCamOn = videoTrack.enabled
      }
    }
  }
}
</script>
