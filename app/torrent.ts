import * as _ from 'lodash';
import Peer from './peer';

export default class Torrent {
  private infoHash: string;
  private peers: {
    [peerId: string]: Peer;
  };

  constructor(infoHash: string) {
    this.infoHash = infoHash;
    this.peers = {};
  }

  getInfoHash() {
    return this.infoHash;
  }

  getPeers(): Peer[] {
    return <Peer[]> _.values(this.peers);
  }

  setPeer(peer: Peer) {
    this.peers[peer.peerId] = peer;
  }

  getComplete() {
    return _.filter(this.peers, x => x.left === 0).length;
  }

  getIncomplete() {
    return _.reject(this.peers, x => x.left === 0).length;
  }

  removePeer(peerId: string) {
    delete this.peers[peerId];
  }
}
