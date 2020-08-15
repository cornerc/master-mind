<template>
  <div class="home">
    <div class="ma-6">
      <div class="text-h1">Hit & Blow</div>
      <div class="text-body-1">
        0~9で構成された数字の列を得られるヒントを頼りに当てるゲームです
      </div>
    </div>
    <div class="ma-6">
      <div class="text-h3">基本ルール</div>
      <div class="text-body-1">
        <ul>
          <li>プレイヤーはある数字の列を申告します</li>
          <li>
            出題側(CPU)はその数字の列に対してヒット数とブロー数を回答します
            <ul>
              <li>ヒット・・・数字も位置も合っている</li>
              <li>ブロー・・・位置は違うが数字は使われている</li>
            </ul>
          </li>
          <li>
            これを繰り返して、プレイヤーが数字の列を完全に当てた時点でゲーム終了です
          </li>
        </ul>
      </div>
    </div>

    <div class="ma-6">
      <div class="text-h3">遊び方</div>
      <div class="text-h5 my-3">
        <v-icon size="32">mdi-account</v-icon>一人で遊ぶ
      </div>
      <div class="text-body-1 my-3">
        コンピュータがランダムで決めた数字の列を当てたらゲームクリアです
      </div>
      <div class="text-h5 my-3">
        <v-icon size="32">mdi-head-snowflake</v-icon>コンピュータと戦う
      </div>
      <div class="text-body-1 my-3">
        <div>
          プレイヤーとコンピュータはお互いが決めた数字の列を当て合います
        </div>
        <div>コンピュータより先に決めた数字の列を当てたらゲームクリアです</div>
      </div>
      <div class="text-body-1 my-3">
        ノーマルモード・・・ほとんど当てずっぽうとはいえ無駄なことはしないのでまあまあ強いです
      </div>
      <div class="text-body-1 my-3">
        鬼モード・・・ノーマルモードの２倍強いです
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
