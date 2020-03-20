package immutable;

import org.junit.Test;

public class ImmutableStackTest {
    @Test
    public void test() {
        Stack<Integer> s = ImmutableStack.getEmptyStack();
        s = s.push(10);
        print(s);
        s = s.push(20);
        print(s);
        s = s.push(30);
        print(s);
        s = s.push(null);
        print(s);
        s = s.push(40);
        print(s);
    }

    private static void print(Stack<Integer> s) {
        while (s != null && !s.isEmpty()) {
            System.out.print(s.head() + " -> ");
            s = s.pop();
        }
        System.out.println();
    }
}