public class InsertSort {

    public static void main(String[] args) {
        int[] list = {4, 2, 1, 5, 7, 6, 3, 8, 10, 9};

        InsertSort obj = new InsertSort();
        obj.sort(list);
        printArray(list);
    }

    public void sort(int arr[]) {
        int n = arr.length;

        // iは未ソート配列のインデックス
        for (int i = 1; i < n; ++i) {
            // keyはソートする値
            int key = arr[i];
            // jはソート済み配列のインデックス
            int j = i - 1;

            // ソート対象の数値をソート済み配列の数値と比較していく
            while (j >= 0 && arr[j] > key) {
                // ソート済みの配列を1つ右にずらす
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
        System.out.println();
    }

}
