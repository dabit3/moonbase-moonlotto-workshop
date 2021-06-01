import {
  PlayerJoined,
  LotteryResult,
} from "./types/MoonLotto/MoonLotto";
import { Round, Player, Ticket } from "./types/schema";

export function handlePlayerJoined(event: PlayerJoined): void {
  // ID for the round:
  // round number
  let roundId = event.params.round.toString();
  // try to load Round from a previous player
  let round = Round.load(roundId);
  // if round doesn't exists, it's the first player in the round -> create round
  if (round == null) {
    round = new Round(roundId);
    round.timestampInit = event.block.timestamp;
  }
  round.index = event.params.round;
  round.prize = event.params.prizeAmount;

  round.save();

  // ID for the player:
  // issuer address
  let playerId = event.params.player.toHex();
  // try to load Player from previous rounds
  let player = Player.load(playerId);
  // if player doesn't exists, create it
  if (player == null) {
    player = new Player(playerId);
  }
  player.address = event.params.player;

  player.save();

  // ID for the ticket (round - player_address - ticket_index_round):
  // "round_number" + "-" + "player_address" + "-" + "ticket_index_per_round"
  let nextTicketIndex = event.params.ticketIndex.toString();
  let ticketId = roundId + "-" + playerId + "-" + nextTicketIndex;

  let ticket = new Ticket(ticketId);
  ticket.round = roundId;
  ticket.player = playerId;
  ticket.isGifted = event.params.isGifted;
  ticket.isWinner = false;

  ticket.save();  
}

export function handleLotteryResult(event: LotteryResult): void {
  let roundId = event.params.round.toString();    
  // ID for the round:
  // round number
  let round = Round.load(roundId);  
  round.prize = event.params.prizeAmount;
  round.timestampEnd = event.block.timestamp;
  
  round.save();
  
  let ticketIndex = event.params.ticketIndex.toString();
  let playerId = event.params.winner.toHex();  
  let ticketId = roundId + "-" + playerId + "-" + ticketIndex;
  // ID for the ticket:
  // "round_number" + "-" + "player_address" + "-" + "ticket_index"
  let ticket = Ticket.load(ticketId);  
  ticket.isWinner = true;
  
  ticket.save();
}
