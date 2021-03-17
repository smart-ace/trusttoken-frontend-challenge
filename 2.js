// The time complexity of this solution is O(k*n). Where k is the number of the sorted linked lists and n is the total number of
// the elements included in those lists.
// In the example test case, k is 3 and n is 8.
// Because we need to push all of the elements to the linked list. Which will be O(n). And each time we need to find the smallest element.
// But the linked lists are already sorted. So we don't need to check all of the element, but only the header values.
// So the optimal solution will be O(k*n). Because we need to compare the "k" header values to find the minimum value

class Node {
  // node for linked list
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  // linked list implementation
  constructor(dataArr = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let i = 0; i < dataArr.length; i++) {
      this.push(dataArr[i]);
    }
  }

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return;

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }
  }

  print() {
    let current = this.head;
    const valArr = [];

    while (current !== null) {
      valArr.push(current.val);
      current = current.next;
    }

    console.log(valArr.join('->'));
  }
}

function mergeSortedLinkedList(linkedListArr) {
  let mergedList = new LinkedList(),
    i,
    j;
  const length = linkedListArr.reduce((prevLength, list) => prevLength + list.length, 0); // calculate the total number of elements
  const k = linkedListArr.length;

  for (i = 0; i < length; i++) {
    // find minimum value
    let min = undefined,
      minIndex;

    for (j = 0; j < k; j++) {
      if (linkedListArr[j].head && (min === undefined || linkedListArr[j].head.val < min)) {
        min = linkedListArr[j].head.val;
        minIndex = j;
      }
    }

    mergedList.push(min);
    linkedListArr[minIndex].shift();
  }

  mergedList.print();
  return mergedList;
}

mergeSortedLinkedList([new LinkedList([1, 4, 5]), new LinkedList([1, 3, 4]), new LinkedList([2, 6])]);
