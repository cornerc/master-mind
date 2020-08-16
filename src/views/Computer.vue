<template>
  <div class="computer">
    <div class="my-6">
      <div
        class="text-h2"
        :class="isGameOver && isWin ? 'clear-animation' : ''"
      >
        Hit & Blow (対CPU)
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
          <v-btn-toggle v-model="digit" mandatory @change="runValid">
            <v-btn :value="3"><v-icon>mdi-numeric-3</v-icon></v-btn>
            <v-btn :value="4"><v-icon>mdi-numeric-4</v-icon></v-btn>
            <v-btn :value="5"><v-icon>mdi-numeric-5</v-icon></v-btn>
            <v-btn :value="6"><v-icon>mdi-numeric-6</v-icon></v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-card-title>重複</v-card-title>
        <v-card-actions class="px-6">
          <v-btn-toggle v-model="duplicated" mandatory @change="runValid">
            <v-btn :value="false" class="font-weight-bold">なし</v-btn>
            <v-btn :value="true" class="font-weight-bold">あり</v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-card-title>CPUレベル</v-card-title>
        <v-card-actions class="px-6">
          <v-btn-toggle v-model="level" mandatory>
            <v-btn :value="1" class="font-weight-bold">ノーマル</v-btn>
            <v-btn :value="2" class="font-weight-bold">鬼</v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-card-title>
          あなたの数字(桁数が設定より少ないとゼロ埋めされます)
        </v-card-title>
        <v-form v-model="valid" ref="form">
          <v-card-actions class="px-6">
            <v-text-field
              v-model.number="yourNumber"
              :rules="checkYourNumber"
            ></v-text-field>
          </v-card-actions>
          <v-divider />
          <v-card-actions>
            <v-btn :disabled="!valid" block text depressed @click="start">
              Start
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col class="d-flex" cols="12" md="11">
        <v-row>
          <v-col cols="5">
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
                :color="i == selectedIdx ? 'primary' : ''"
                :large="isLarge"
                :x-small="!isLarge"
                :height="computedHeight"
                @click="selectedIdx = i"
              >
                <v-icon :large="isLarge">mdi-numeric-{{ v }}</v-icon>
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
          <v-col cols="7">
            <v-sheet class="d-flex align-center justify-center">
              <v-simple-table dark fixed-header height="516">
                <template #default>
                  <thead>
                    <tr>
                      <th>No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A</td>
                    </tr>
                    <tr v-for="(_, index) in historys" :key="index">
                      <td>{{ index + 1 }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <v-divider vertical />
              <v-simple-table dark fixed-header height="516">
                <template #default>
                  <thead>
                    <tr>
                      <th>YOURS</th>
                      <th>H</th>
                      <th>B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <template v-if="field !== undefined && isGameOver">
                          <span
                            v-for="(i, idx) of field.get().join('')"
                            :key="idx + 'ans'"
                          >
                            <v-icon color="primary">mdi-numeric-{{ i }}</v-icon>
                          </span>
                        </template>
                        <template v-else>
                          <span v-for="(_, idx) of digit" :key="idx + 'sec'">
                            <v-icon color="primary">
                              mdi-help-circle-outline
                            </v-icon>
                          </span>
                        </template>
                      </td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr v-for="(item, index) in historys" :key="index">
                      <td>
                        <span
                          v-for="(a, idx) in item.answer"
                          :key="index + idx"
                        >
                          <v-icon>mdi-numeric-{{ a }}</v-icon>
                        </span>
                      </td>
                      <td>{{ item.hit }}</td>
                      <td>{{ item.blow }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-divider vertical />
              <v-simple-table dark fixed-header height="516">
                <template #default>
                  <thead>
                    <tr>
                      <th>
                        CPU
                        <v-progress-circular
                          class="mx-2"
                          :indeterminate="isCpuConsider"
                          size="24"
                          color="primary"
                        >
                        </v-progress-circular>
                      </th>
                      <th>H</th>
                      <th>B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <template v-if="yourField !== undefined">
                          <span
                            v-for="(i, idx) of yourField.get().join('')"
                            :key="idx + 'yournumber'"
                          >
                            <v-icon color="primary">mdi-numeric-{{ i }}</v-icon>
                          </span>
                        </template>
                      </td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr v-for="(item, index) in historysOfCpu" :key="index">
                      <td>
                        <span
                          v-for="(a, idx) in item.answer"
                          :key="index + idx"
                        >
                          <v-icon>mdi-numeric-{{ a }}</v-icon>
                        </span>
                      </td>
                      <td>{{ item.hit }}</td>
                      <td>{{ item.blow }}</td>
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
      <div class="text-h2">{{ snackbarText }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import MasterMindBot, { Field } from "master-mind-bot";
export default {
  name: "Computer",
  data: () => ({
    valid: true,
    yourNumber: 1234,
    yourField: undefined,
    isGameOver: false,
    isWin: false,
    isCpuConsider: false,
    historys: [],
    historysOfCpu: [],
    selectedIdx: 0,
    answer: [],
    field: undefined,
    bot: undefined,
    dialog: true,
    digit: 4,
    duplicated: false,
    level: 0,
    snackbarText: ""
  }),
  computed: {
    isLarge() {
      return this.digit < 5;
    },
    computedHeight() {
      return this.isLarge ? 78 : 41.75;
    },
    checkYourNumber() {
      return [
        v => v.toString().length <= this.digit || "桁数が設定を超えています",
        v =>
          this.duplicated ||
          (!this.duplicated && !new Field(v, this.digit).isDuplicated()) ||
          "重複しています"
      ];
    }
  },
  methods: {
    start() {
      this.dialog = false;
      this.field = new Field(
        this.genRandomValue(this.digit, this.duplicated),
        this.digit
      );
      this.yourField = new Field(this.yourNumber, this.digit);
      this.bot = new MasterMindBot(
        this.yourNumber,
        this.digit,
        this.level,
        this.duplicated
      );
      this.answer = [...Array(this.digit).keys()];
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
    changeValue(value) {
      if (this.isGameOver || this.isCpuConsider) return;
      this.answer[this.selectedIdx] = value;
      this.selectedIdx = this.selectedIdx + 1;
      if (this.answer.length === this.selectedIdx) {
        this.selectedIdx = 0;
      }
    },
    clearValue() {
      if (this.isGameOver || this.isCpuConsider) return;
      let answer = this.answer.concat();
      for (let i = 0; i < this.digit; i++) {
        answer[i] = 0;
      }
      this.answer = answer;
    },
    async checkValue() {
      if (this.isGameOver || this.isCpuConsider) return;
      this.isCpuConsider = true;
      const answer = this.answer.join("");
      const res = this.field.answer(new Field(answer, this.digit));
      this.historys.push({
        answer: answer,
        hit: res.hit,
        blow: res.blow
      });

      if (this.digit === res.hit) {
        this.gameOver(true);
        return;
      }

      await window.setTimeout(() => {
        const cpuRes = this.bot.execute();
        this.historysOfCpu.push({
          answer: cpuRes.field.get().join(""),
          hit: cpuRes.answer.hit,
          blow: cpuRes.answer.blow
        });
        if (this.digit === cpuRes.answer.hit) {
          this.gameOver(false);
        }
        this.isCpuConsider = false;
      }, 500);
    },
    gameOver(isWin) {
      this.isGameOver = true;
      this.isWin = isWin;
      if (isWin) {
        this.snackbarText = "You Win！！";
      } else {
        this.snackbarText = "ドンマイ";
      }
    },
    reload() {
      this.yourNumber = 1234;
      this.yourField = undefined;
      this.isWin = false;
      this.isGameOver = false;
      this.isCpuConsider = false;
      this.historys = [];
      this.historysOfCpu = [];
      this.selectedIdx = 0;
      this.answer = [];
      this.field = undefined;
      this.bot = undefined;
      this.dialog = true;
      this.snackbarText = "";
    },
    runValid() {
      this.$refs.form.validate();
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
