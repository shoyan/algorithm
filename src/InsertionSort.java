public class InsertionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                printArray(arr);
                j = j - 1;
            }
            arr[j + 1] = key;
            printArray(arr);
        }
    }

    static void printArray(int arr[]) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String args[]) {
        //int[] list = {4, 2, 1, 5, 7, 6, 3, 8, 10, 9};
        int[] list = {4, 2, 5, 1};
        InsertionSort insertionSort = new InsertionSort();
        insertionSort.sort(list);
        printArray(list);
    }
}
