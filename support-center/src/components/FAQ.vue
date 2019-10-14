<template>
  <main class="faq">
    <h1>Frequently Asked Questions</h1>

    <div class="error" v-if="hasRemoteErrors">Can't load the questions</div>
    <Loading v-if="remoteDataBusy" />
    <section class="list">
      <article :key="question.title" v-for="question of questionList">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
// export default {
//   data() {
//     return {
//       questions: [],
//       error: null,
//       loading: false,
//     };
//   },
//   async created() {
//     this.loading = true;
//     try {
//       this.questions = await this.$fetch("questions");
//     } catch (e) {
//       this.error = e;
//     }
//     this.loading = false;
//   },
// };
</script>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      questionList: 'questions',
    }),
  ],
  // ...
}
</script>