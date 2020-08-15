<template>
  <div class="single">
    <div class="my-6">
      <div class="text-h2" :class="isGameOver ? 'clear-animation' : ''">
        Hit & Blow (シングル)
        <v-btn text fab title="やり直す" @click="reload">
          <v-icon large>mdi-reload</v-icon>
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="dialog" width="70%" persistent>
      <v-card>
        <v-card-title class="headline">設定</v-card-title>
        <v-card-title>桁数</v-card-title>
        <v-card-actions class="px-6">
          <v-btn-toggle v-model="digit" mandatory>
            <v-btn value="3"><v-icon>mdi-numeric-3</v-icon></v-btn>
            <v-btn value="4"><v-icon>mdi-numeric-4</v-icon></v-btn>
            <v-btn value="5"><v-icon>mdi-numeric-5</v-icon></v-btn>
            <v-btn value="6"><v-icon>mdi-numeric-6</v-icon></v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-card-title>重複</v-card-title>
        <v-card-actions class="px-6">
          <v-btn-toggle v-model="duplicated" mandatory>
            <v-btn class="font-weight-bold">なし</v-btn>
            <v-btn class="font-weight-bold">あり</v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-divider />
        <v-card-actions>
          <v-btn block text depressed @click="start">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col class="d-flex" cols="12" md="11">
        <v-row>
          <v-col cols="6">
            <v-sheet
              class="d-flex align-center justify-center"
              color="green lighten-3"
              height="150"
              shaped
            >
              <v-btn
                v-for="(v, i) in answer"
                :key="i"
                class="mx-1"
                :color="isSelected(i) ? 'primary' : ''"
                :large="isLarge"
                :x-small="!isLarge"
                :height="computedHeight"
                @click="selectIdx(i)"
              >
                <v-icon large>mdi-numeric-{{ v }}</v-icon>
              </v-btn>
            </v-sheet>
            <v-sheet
              class="d-flex align-center justify-center mt-4"
              color="red lighten-3"
              height="350"
              shaped
            >
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn class="mx-2" fab @click="changeValue(1)">
                    <v-icon>mdi-numeric-1</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(2)">
                    <v-icon>mdi-numeric-2</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(3)">
                    <v-icon>mdi-numeric-3</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn class="mx-2" fab @click="changeValue(4)">
                    <v-icon>mdi-numeric-4</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(5)">
                    <v-icon>mdi-numeric-5</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(6)">
                    <v-icon>mdi-numeric-6</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn class="mx-2" fab @click="changeValue(7)">
                    <v-icon>mdi-numeric-7</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(8)">
                    <v-icon>mdi-numeric-8</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(9)">
                    <v-icon>mdi-numeric-9</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn
                    class="mx-2"
                    fab
                    @click="clearValue"
                    title="回答をクリアする"
                  >
                    <v-icon>mdi-alpha-c-circle-outline</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="changeValue(0)">
                    <v-icon>mdi-numeric-0</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab @click="checkValue" title="回答する">
                    <v-icon dark>mdi-check-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="d-flex align-center justify-center">
              <v-simple-table dark fixed-header height="516">
                <template #default>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>ANSWER</th>
                      <th>HIT</th>
                      <th>BLOW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in historys" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <span
                          v-for="(a, idx) in item.answer"
                          :key="index + idx"
                        >
                          <v-icon>mdi-numeric-{{ a }}</v-icon>
                        </span>
                      </td>
                      <td>
                        <v-icon>mdi-numeric-{{ item.hit }}</v-icon>
                      </td>
                      <td>
                        <v-icon>mdi-numeric-{{ item.blow }}</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar centered :value="isGameOver" shaped>
      <div class="text-h2">正解！！</div>
    </v-snackbar>
  </div>
</template>

<script>
import { Field } from "master-mind-bot";
export default {
  name: "Single",
  data: () => ({
    isGameOver: false,
    historys: [],
    selectedIdx: 0,
    answer: [],
    field: undefined,
    dialog: true,
    digit: "4",
    duplicated: 0
  }),
  computed: {
    isLarge() {
      return parseInt(this.digit) < 5;
    },
    computedHeight() {
      return this.isLarge ? 78 : 53.75;
    }
  },
  methods: {
    start() {
      this.dialog = false;
      this.field = new Field(
        this.genRandomValue(parseInt(this.digit), this.duplicated),
        this.digit
      );
      this.answer = [...Array(parseInt(this.digit)).keys()];
    },
    genRandomValue(digit, duplicated) {
      let result = "";
      let nums = [...Array(10).keys()];
      for (let i = 0; i < digit; i++) {
        let index = Math.floor(Math.random() * Math.floor(nums.length));
        result += nums[index].toString();
        if (!duplicated) nums.splice(index, 1);
      }
      return parseInt(result);
    },
    isSelected(index) {
      return index === this.selectedIdx;
    },
    selectIdx(index) {
      this.selectedIdx = index;
    },
    changeValue(value) {
      if (this.isGameOver) return;
      this.answer[this.selectedIdx] = value;
      this.selectedIdx = this.selectedIdx + 1;
      if (this.answer.length === this.selectedIdx) {
        this.selectedIdx = 0;
      }
    },
    clearValue() {
      if (this.isGameOver) return;
      let answer = this.answer.concat();
      for (let i = 0; i < parseInt(this.digit); i++) {
        answer[i] = 0;
      }
      this.answer = answer;
    },
    checkValue() {
      if (this.isGameOver) return;
      const answer = this.answer.join("");
      const res = this.field.answer(new Field(answer, this.digit));
      this.historys.push({
        answer: this.answer,
        hit: res.hit,
        blow: res.blow
      });

      if (parseInt(this.digit) === res.hit) {
        this.gameOver();
      }
    },
    gameOver() {
      this.isGameOver = true;
    },
    reload() {
      this.isGameOver = false;
      this.historys = [];
      this.selectedIdx = 0;
      this.answer = [];
      this.field = undefined;
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.clear-animation {
  animation: color-change 2s linear infinite;
}

@keyframes color-change {
  0%,
  100% {
    color: #ff1493;
  }

  25% {
    color: #7fff00;
  }

  50% {
    color: #0091ea;
  }

  75% {
    color: #9400d3;
  }
}
</style>
