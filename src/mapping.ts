import {
  TravaArmoury,
  ChestOpen,
  Transfer
} from "../generated/TravaArmoury/TravaArmoury"
import { Token, User } from "../generated/schema"

export function handleChestOpen(event: ChestOpen): void {
  let token = Token.load(event.params.tokenId.toString());
  if(!token) {
    token = new Token(event.params.tokenId.toString());
    token.tokenID = event.params.tokenId;
    token.collectionID = event.params.collectionId;

    let contract = TravaArmoury.bind(event.address);
    token.owner = contract.ownerOf(event.params.tokenId).toHexString();
  }
  token.save();
}

export function handleTransfer(event: Transfer): void {
  let user = User.load(event.params.to.toHexString());
  if(!user){
    user = new User(event.params.to.toHexString());
    user.address = event.params.to;
  }
  user.save();
}
