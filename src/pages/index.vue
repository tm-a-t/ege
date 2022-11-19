<template>
  <div class="heading">
    <h1>Вся&nbsp;теория к&nbsp;ЕГЭ<br>по&nbsp;русскому</h1>
    <a href="tg://msg_url?url=tmat.me%2Fege" class="share">
      <svg width="170" height="141" viewBox="0 0 170 141" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M155.329 1.92015C155.329 1.92015 170.944 -4.15235 169.642 10.5951C169.209 16.6676 165.305 37.9214 162.269 60.9101L151.859 129.009C151.859 129.009 150.991 138.985 143.184 140.72C135.376 142.455 123.665 134.648 121.496 132.913C119.761 131.611 88.9649 112.093 78.1211 102.55C75.0849 99.9476 71.6149 94.7426 78.5549 88.6701L124.099 45.2951C129.304 40.0901 134.509 27.9451 112.821 42.6926L52.0961 83.8989C52.0961 83.8989 45.1561 88.2364 32.1436 84.3326L3.94985 75.6576C3.94985 75.6576 -6.46014 69.1514 11.3236 62.6451C54.6986 42.2589 108.05 21.4389 155.329 1.92015Z"/>
      </svg>
      Поделиться
    </a>
  </div>

  <div class="block">
    <div class="block-title">Тексты</div>
    <router-link to="/ege/essay" class="button-link">Сочинение</router-link>
    <router-link to="/ege/styles" class="button-link">Стили речи</router-link>
    <router-link to="/ege/types" class="button-link">Типы речи</router-link>
  </div>

  <div class="block">
    <div class="block-title">Орфография</div>
    <router-link to="/ege/roots" class="button-link">Корни <em>№9</em></router-link>
    <router-link to="/ege/verbs" class="button-link">Глаголы <em>№12</em></router-link>
    <router-link to="/ege/ne" class="button-link">не- <em>№13</em></router-link>
    <router-link to="/ege/capitals" class="button-link">Большие буквы</router-link>
    <router-link to="/ege/prefixes" class="button-link button-link-disabled">Приставки <em>№10</em></router-link>
    <router-link to="/ege/suffixes" class="button-link button-link-disabled">Суффиксы <em>№11</em></router-link>
    <router-link to="/ege/n" class="button-link button-link-disabled">н/нн <em>№15</em></router-link>
    <router-link to="/ege/spaces" class="button-link button-link-disabled"> Слитное, раздельное, дефисное написание <em>№14</em></router-link>
  </div>

  <div class="block">
    <div class="block-title">Нормы языка</div>
    <router-link to="/ege/stress" class="button-link">Ударения <em>№4</em></router-link>
    <router-link to="/ege/plural" class="button-link">Множественное число существительных <em>№7</em></router-link>
    <router-link to="/ege/indeclinable" class="button-link">Род несклоняемых существительных</router-link>
    <router-link to="/ege/geo" class="button-link">Склонение географических названий</router-link>
    <router-link to="/ege/lexical" class="button-link">Лексические нормы</router-link>
    <router-link to="/ege/speech" class="button-link">Речевые ошибки</router-link>
    <router-link to="/ege/figures" class="button-link">Средства художественной выразительности <em>№26</em></router-link>
    <router-link to="/ege/grammar" class="button-link">Грамматические и синтаксические ошибки <em>№8</em></router-link>
  </div>

  <p class="credits">
    <span>Рассказала Марина Юрьевна,</span>
    <span>законспектировала очаровательная Яна&nbsp;Решетникова,</span>
    <span>сверстал <a href="https://tmat.me" target="_blank">Артём Иванов</a>.</span>
  </p>

  <p>Заблокированные разделы откроются позже.</p>

  <p>2022 год.</p>
</template>

<style scoped>
.heading {
  margin: 8rem 0 4rem;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
}

.share {
  padding: .75em 1.5em .75em .5em;
}

.share svg {
  width: .9em;
  height: auto;
  padding: .5em;
  margin: -.5em -.1em -.5em -.1em;
}

.block {
  margin: 4rem 0;
}

.block-title {
  margin: 0 1rem 1rem;
}

p {
  margin: 2rem 1rem;
}

p.credits > * {
  display: block;
  margin-bottom: 0;
}
</style>