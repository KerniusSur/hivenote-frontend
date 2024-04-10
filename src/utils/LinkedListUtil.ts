import LinkedList from "models/general/LinkedList";

const LinkedListUtil = {
  mapToLinkedList: (list: any): LinkedList<any> => {
    console.log("List: ", list);
    const linkedList: LinkedList<any> = new LinkedList();

    list.forEach((component: any) => {
      linkedList.insertAtEnd(component);
    });
    console.log("LinkedList: ", linkedList);

    return linkedList;
  },

  mapFromLinkedListToList: (linkedList: LinkedList<any>): any[] => {
    console.log("LinkedList: ", linkedList);
    const list: any[] = linkedList.traverse();

    console.log("List: ", list);
    console.log("List: ", list);

    return list;
  },
};

export default LinkedListUtil;
