import { MinDateHeap } from '../min-date-heap';

function makeSut() {
  const sut = new MinDateHeap();
  return { sut };
}

describe('MinDateHeap', () => {
  test('Should correctly add to the end of the heap, length should be 1', () => {
    const { sut } = makeSut();

    sut.add('entry1', new Date(0));

    expect(sut.length).toBe(1);
    expect(sut.heap[sut.length - 1]?.user_id).toBe('entry1');
  });

  test('Should correctly pop the head of the heap, length should be 0', () => {
    const { sut } = makeSut();

    sut.add('entry1', new Date(0));
    const user_id = sut.pop();

    expect(sut.length).toBe(0);
    expect(user_id).toBe('entry1');
  });

  test('Should correctly add 2 items to the heap and adjust the order, peek should return heap head, length should be 2', () => {
    const { sut } = makeSut();

    sut.add('entry_late', new Date(1));
    sut.add('entry_early', new Date(0));

    expect(sut.length).toBe(2);
    expect(sut.heap[0]?.user_id).toBe(sut.peek());
    expect(sut.peek()).toBe('entry_early');
  });

  test('Should correctly maintain order after several inserts', () => {
    const { sut } = makeSut();

    sut.add('entry_3', new Date(3));
    sut.add('entry_2', new Date(2));
    sut.add('entry_4', new Date(4));
    sut.add('entry_0', new Date(0));
    sut.add('entry_1', new Date(1));

    const ans = [
      { user_id: 'entry_0', date: new Date(0) },
      { user_id: 'entry_1', date: new Date(1) },
      { user_id: 'entry_4', date: new Date(4) },
      { user_id: 'entry_3', date: new Date(3) },
      { user_id: 'entry_2', date: new Date(2) },
    ];

    expect(sut.length).toBe(5);
    expect(sut.heap).toMatchObject(ans);
  });

  test('Should correctly maintain order after several pop operations', () => {
    const { sut } = makeSut();

    sut.add('entry_3', new Date(3));
    sut.add('entry_2', new Date(2));
    sut.add('entry_4', new Date(4));
    sut.add('entry_0', new Date(0));
    sut.add('entry_1', new Date(1));

    sut.pop();
    // console.log(sut.heap);

    const ans = [
      { user_id: 'entry_1', date: new Date(1) },
      { user_id: 'entry_2', date: new Date(2) },
      { user_id: 'entry_4', date: new Date(4) },
      { user_id: 'entry_3', date: new Date(3) },
    ];

    expect(sut.length).toBe(4);
    expect(sut.heap).toMatchObject(ans);

    sut.pop();

    const ans1 = [
      { user_id: 'entry_2', date: new Date(2) },
      { user_id: 'entry_3', date: new Date(3) },
      { user_id: 'entry_4', date: new Date(4) },
    ];

    expect(sut.length).toBe(3);
    expect(sut.heap).toMatchObject(ans1);

    sut.pop();

    const ans2 = [
      { user_id: 'entry_3', date: new Date(3) },
      { user_id: 'entry_4', date: new Date(4) },
    ];

    expect(sut.length).toBe(2);
    expect(sut.heap).toMatchObject(ans2);
  });

  test('Should correctly remove item and maintain order when removing from end', () => {
    const { sut } = makeSut();

    sut.add('entry_3', new Date(3));
    sut.add('entry_2', new Date(2));
    sut.add('entry_4', new Date(4));
    sut.add('entry_0', new Date(0));
    sut.add('entry_1', new Date(1));

    sut.remove('entry_2');

    const ans = [
      { user_id: 'entry_0', date: new Date(0) },
      { user_id: 'entry_1', date: new Date(1) },
      { user_id: 'entry_4', date: new Date(4) },
      { user_id: 'entry_3', date: new Date(3) },
    ];

    expect(sut.length).toBe(4);
    expect(sut.heap).toMatchObject(ans);
  });

  test('Should correctly remove item and maintain order when removing from start', () => {
    const { sut } = makeSut();

    sut.add('entry_3', new Date(3));
    sut.add('entry_2', new Date(2));
    sut.add('entry_4', new Date(4));
    sut.add('entry_0', new Date(0));
    sut.add('entry_1', new Date(1));

    sut.remove('entry_0');

    const ans = [
      { user_id: 'entry_1', date: new Date(1) },
      { user_id: 'entry_2', date: new Date(2) },
      { user_id: 'entry_4', date: new Date(4) },
      { user_id: 'entry_3', date: new Date(3) },
    ];

    expect(sut.length).toBe(4);
    expect(sut.heap).toMatchObject(ans);
  });

  test('Should correctly remove item and maintain order when removing from middle', () => {
    const { sut } = makeSut();

    sut.add('entry_3', new Date(3));
    sut.add('entry_2', new Date(2));
    sut.add('entry_4', new Date(4));
    sut.add('entry_0', new Date(0));
    sut.add('entry_1', new Date(1));

    sut.remove('entry_1');

    const ans = [
      { user_id: 'entry_0', date: new Date(0) },
      { user_id: 'entry_2', date: new Date(2) },
      { user_id: 'entry_4', date: new Date(4) },
      { user_id: 'entry_3', date: new Date(3) },
    ];

    expect(sut.length).toBe(4);
    expect(sut.heap).toMatchObject(ans);
  });
});
