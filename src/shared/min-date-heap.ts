type HeapNode = {
  user_id: string;
  date: Date;
};

export class MinDateHeap {
  private data: Array<HeapNode | undefined> = [];
  private index_map = new Map<string, number>();
  private data_length = 0;

  add(user_id: string, date: Date): void {
    const exists = this.index_map.get(user_id);
    if (exists) {
      this.remove(user_id);
    }

    this.index_map.set(user_id, this.data_length);
    this.data[this.data_length] = { user_id, date };

    this.heapify_up(this.data_length);
    this.data_length++;
  }

  pop(): string | undefined {
    if (this.data_length === 0) {
      return;
    }

    const curr = this.data[0];
    if (!curr) {
      throw new Error('You did something wrong');
    }
    this.data_length--;

    if (this.data_length === 0) {
      this.data = [];
      this.index_map.delete(curr.user_id);
      return curr.user_id;
    }

    const last_item = this.data[this.data_length];
    if (!last_item) {
      throw new Error('You dont know what you are doing');
    }
    this.swap(0, this.data_length);
    this.data.pop();
    this.index_map.delete(curr.user_id);
    this.heapify_down(0);
    return curr.user_id;
  }

  remove(user_id: string): string | undefined {
    const idx = this.index_map.get(user_id);
    if (idx === undefined) {
      return undefined;
    }

    if (idx === 0) {
      return this.pop();
    }

    this.index_map.delete(user_id);
    const curr = this.data[idx];
    if (!curr) {
      throw new Error('You dont know what you are doing');
    }

    this.data_length--;
    if (idx === this.data_length) {
      this.data.pop();
      return curr.user_id;
    }

    if (this.data_length === 0) {
      this.data = [];
      return curr.user_id;
    }

    const swaped_node = this.data[this.data_length];

    const parent_idx = this.parent(idx);
    const parent = this.data[parent_idx];
    if (!swaped_node || !parent) {
      throw new Error('You dont know what you are doing');
    }

    this.data[idx] = swaped_node;
    this.index_map.set(swaped_node.user_id, idx);
    this.data.pop();

    if (swaped_node.date < parent.date) {
      this.heapify_up(idx);
    } else {
      this.heapify_down(idx);
    }
  }

  peek(): string | undefined {
    return this.data[0]?.user_id;
  }

  get heap(): Array<HeapNode | undefined> {
    return structuredClone(this.data);
  }

  get hash_map(): Map<string, number> {
    return new Map(this.index_map);
  }

  get length(): number {
    return this.data_length;
  }

  private heapify_up(idx: number): void {
    if (idx === 0) {
      return;
    }

    const parent_idx = this.parent(idx);
    const parent = this.data[parent_idx];
    const curr = this.data[idx];

    if (!curr || !parent) {
      throw new Error('You did something wrong');
    }

    if (curr.date < parent.date) {
      this.swap(idx, parent_idx);
      this.heapify_up(parent_idx);
    }
  }

  private heapify_down(idx: number): void {
    const left_child_idx = this.left_child(idx);
    if (idx >= this.data_length || left_child_idx >= this.data_length) {
      return;
    }

    const curr = this.data[idx];
    const left_child = this.data[left_child_idx];
    if (!curr || !left_child) {
      throw new Error('You did something wrong');
    }

    const right_child_idx = this.right_child(idx);
    const right_child = this.data[right_child_idx];

    if (!right_child) {
      if (curr.date > left_child.date) {
        this.swap(idx, left_child_idx);
      }
      return;
    }

    if (left_child.date > right_child.date && curr.date > right_child.date) {
      this.swap(idx, right_child_idx);
      this.heapify_down(right_child_idx);
    } else if (
      right_child.date > left_child.date &&
      curr.date > left_child.date
    ) {
      this.swap(idx, left_child_idx);
      this.heapify_down(left_child_idx);
    }
  }

  private swap(idx1: number, idx2: number): void {
    const temp1 = this.data[idx1] as HeapNode;
    const temp2 = this.data[idx2] as HeapNode;
    this.data[idx1] = temp2;
    this.data[idx2] = temp1;
    this.index_map.set(temp2.user_id, idx1);
    this.index_map.set(temp1.user_id, idx2);
  }

  private left_child(idx: number): number {
    return 2 * idx + 1;
  }

  private right_child(idx: number): number {
    return 2 * idx + 2;
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }
}
