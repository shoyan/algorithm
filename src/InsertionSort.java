public class InsertionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    static void printArray(int arr[]) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }

    public static void main(String args[]) {
        int[] list = {4, 2, 1, 5, 7, 6, 3, 8, 10, 9};
        InsertionSort insertionSort = new InsertionSort();
        insertionSort.sort(list);
        printArray(list);
    }
}
