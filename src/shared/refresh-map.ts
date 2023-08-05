type RefreshNode = {
  user_id: string;
  token: string;
  created_at: Date;
  prev_iterator?: RefreshNode;
  next_iterator?: RefreshNode;
  prev_bucket?: RefreshNode;
  next_bucket?: RefreshNode;
};

type ReturnData = {
  user_id: string;
  token: string;
  created_at: Date;
};

export class RefreshMap {
  private data: Array<[head_bucket?: RefreshNode, tail_bucket?: RefreshNode]>;
  private data_length = 0;
  private minimum_capacity;

  // ordered by created_at
  private head_iterator?: RefreshNode;
  private tail_iterator?: RefreshNode;

  constructor(
    private capacity = 8,
    private grow_load_factor = 0.7,
    private shrink_load_factor = 0.3,
  ) {
    this.data = Array.from({ length: capacity }, () => [undefined, undefined]);
    this.minimum_capacity = this.capacity;
    this.head_iterator = this.tail_iterator = undefined;
  }

  set(user_id: string, token: string, created_at: Date): ReturnData {
    return {} as ReturnData;
  }

  get(user_id: string): ReturnData | undefined {
    const idx = this.hash_key(user_id);
    const bucket_head = this.data[idx][0];
    if (!bucket_head) {
      return;
    }

    const node = this.find_in_bucket(bucket_head, user_id);
    if (!node) {
      return;
    }

    return {
      user_id: node.user_id,
      token: node.token,
      created_at: node.created_at,
    };
  }

  remove(user_id: string): ReturnData | undefined {
    const idx = this.hash_key(user_id);
    const bucket = this.data[idx];

    if (!bucket[0]) {
      return;
    }

    const node = this.find_in_bucket(bucket[0], user_id);

    if (!node) {
      return;
    }

    this.break_bucket_link(bucket, node);
    this.break_iterator_link(node);

    return node;
  }

  private hash_key(user_id: string): number {
    let idx = 0;
    for (const char of user_id) {
      idx += char.charCodeAt(0);
    }

    return idx % this.capacity;
  }

  private find_in_bucket(
    bucket_head: RefreshNode,
    user_id: string,
  ): RefreshNode | undefined {
    let curr: RefreshNode | undefined = bucket_head;
    while (curr && curr.user_id !== user_id) {
      curr = curr.next_bucket;
    }

    return curr;
  }

  private break_bucket_link(
    bucket: [head_bucket?: RefreshNode, tail_bucket?: RefreshNode],
    node: RefreshNode,
  ): void {
    const next = node.next_bucket;
    const prev = node.prev_bucket;

    if (next) {
      next.prev_bucket = prev;
    } else {
      bucket[1] = prev;
    }

    if (prev) {
      prev.next_bucket = next;
    } else {
      bucket[0] = next;
    }

    node.prev_bucket = node.next_bucket = undefined;
  }

  private break_iterator_link(node: RefreshNode): void {
    const next = node.next_iterator;
    const prev = node.prev_iterator;

    if (next) {
      next.prev_iterator = prev;
    } else {
      this.tail_iterator = prev;
    }

    if (prev) {
      prev.next_iterator = next;
    } else {
      this.head_iterator = next;
    }

    node.prev_iterator = node.next_iterator = undefined;
  }

  private make_node(
    user_id: string,
    token: string,
    created_at: Date,
  ): RefreshNode {
    return {
      user_id,
      token,
      created_at,
    } as RefreshNode;
  }
}
