type HeapNode<T> = {
  value: T;
  date: Date;
};

export class MinDateHeap<T> {
  private data: Array<HeapNode<T> | undefined> = [];
  private data_length = 0;

  add(value: T, date: Date): void {
    this.data[this.data_length] = { value, date };
    this.heapify_up(this.data_length);
    this.data_length++;
  }

  pop(): T | undefined {
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
      return curr.value;
    }

    this.data[0] = this.data[this.data_length];
    this.data[this.data_length] = undefined;
    this.heapify_down(0);
    return curr.value;
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
      this.data[idx] = parent;
      this.data[parent_idx] = curr;
      this.heapify_up(parent_idx);
    }
  }

  private heapify_down(idx: number): void {
    const left_child_idx = this.left_child(idx);
    if (idx >= this.data_length || left_child_idx >= this.data_length) {
      return;
    }

    const right_child_idx = this.right_child(idx);

    const curr = this.data[idx];
    const left_child = this.data[left_child_idx];
    const right_child = this.data[right_child_idx];
    if (!curr || !left_child || !right_child) {
      throw new Error('You did something wrong');
    }

    if (left_child.date > right_child.date && curr.date > right_child.date) {
      this.data[idx] = right_child;
      this.data[right_child_idx] = curr;
      this.heapify_down(right_child_idx);
    } else if (
      right_child.date > left_child.date &&
      curr.date > left_child.date
    ) {
      this.data[idx] = left_child;
      this.data[left_child_idx] = curr;
      this.heapify_down(left_child_idx);
    }
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
