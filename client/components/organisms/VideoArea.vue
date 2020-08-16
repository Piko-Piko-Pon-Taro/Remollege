<template>
  <v-card :color="$const.BASE_COLOR" class="mx-auto pa-5 elevation-0">
    <div id="videos-container">
      <v-row no-gutters>
        <v-col cols="2">
          <VideoCard
            v-if="localStream"
            :id="'self'"
            :videoWidth="videoWidth"
            :videoHeight="videoHeight"
            :name="user.name"
            :stream="localStream"
            :muted="true"
            class="mt-3 pb-0 mb-0"
          />
          <UserBanner
            v-if="localStream"
            :img="user.img"
            :name="user.name"
            style="width: 100%;"
          />
        </v-col>
        <v-col
          v-for="peerStream in peerStreams"
          :key="peerStream.peerId"
          cols="2"
        >
          <VideoCard
            :id="peerStream.peerId"
            :width="videoWidth"
            :height="videoHeight"
            :stream="peerStream"
            :muted="false"
          />
          <UserBanner
            v-if="localStream"
            :img="user.img"
            :name="user.name"
            style="width: 100%;"
          />
        </v-col>
      </v-row>
    </div>

    <v-bottom-navigation
      v-model="bottomNav"
      :color="$const.MAIN_COLOR"
      :background-color="$const.BASE_COLOR2"
      horizontal
    >
      <v-btn @click="endCall" value="hangup">
        <span>Leave</span>
        <v-icon>mdi-phone-hangup</v-icon>
      </v-btn>

      <v-btn @click="toggleCamera" value="video">
        <span>Video</span>
        <v-icon v-if="isCamOn">mdi-video</v-icon>
        <v-icon v-if="!isCamOn">mdi-video-off</v-icon>
      </v-btn>

      <v-btn @click="toggleMute" value="mic">
        <span>Mic</span>
        <v-icon v-if="!isMute">mdi-microphone</v-icon>
        <v-icon v-if="isMute">mdi-microphone-off</v-icon>
      </v-btn>

      <!-- <v-btn>
        <span value="speaker">Speaker</span>
        <v-icon>mdi-volume-high</v-icon>
        <v-icon>mdi-volume-off</v-icon>
      </v-btn> -->

      <v-dialog v-if="roomId" v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" value="cog">
            <span>Settings</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Settings</span>
          </v-card-title>
          <v-card-subtitle v-if="!selectedAudio || !selectedVideo">
            <span>マイクとカメラを選択してください</span>
          </v-card-subtitle>
          <v-card-text class="my-0 pt-3 pb-0">
            <v-container class="my-0 py-0">
              <v-row class="my-0 py-0">
                <v-col cols="12" class="my-0 py-0">
                  <v-select
                    v-model="selectedAudio"
                    @change="onChange"
                    :items="audioDevices"
                    label="Select Audio"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" class="my-0 py-0">
                  <v-select
                    v-model="selectedVideo"
                    @change="onChange"
                    :items="videoDevices"
                    label="Select Camera"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <ActionButton
              v-if="selectedAudio && selectedVideo"
              @click="dialog = false"
              text="OK"
              class="mx-auto my-0 py-0"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-bottom-navigation>

    <!-- <div class="UI">
      <p>ルーム名:{{ getCurrentRoom }}</p>
    </div> -->
  </v-card>
</template>

<script>
let Peer
if (process.client) {
  Peer = require('skyway-js')
}
export default {
  components: {
    VideoCard: () => import('@/components/organisms/VideoCard'),
    ActionButton: () => import('@/components/atoms/ActionButton'),
    UserBanner: () => import('@/components/organisms/UserBanner')
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
      dialog: true,
      bottomNav: 'cog',
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
      this.$emit('leave')
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
