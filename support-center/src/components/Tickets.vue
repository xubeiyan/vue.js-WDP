<template>
  <div class="tickets">
    <Loading v-if="remoteDataBusy" />

    <div class="empty" v-else-if="tickets.length === 0">You don't have any ticket yet.</div>

    <section v-else class="tickets-list">
      <div :key="ticket.title" v-for="ticket of tickets" class="ticket-item">
        <a @click="id = ticket._id"><span>{{ ticket.title }}</span></a>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date | date}}</span>
      </div>
    </section>

    <Ticket v-if="id" :id="id"/>
  </div>
</template>

<script>
import RemoteData from "../mixins/RemoteData";
import Ticket from "./Ticket.vue";

export default {
  mixins: [
    RemoteData({
      tickets: "tickets"
    })
  ],
  components: {
    Ticket
  },
  data() {
    return {
      id: null
    };
  }
};
</script>