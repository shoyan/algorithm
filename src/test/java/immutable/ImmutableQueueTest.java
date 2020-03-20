package immutable;

import org.junit.Test;

import static org.junit.Assert.assertTrue;

public class ImmutableQueueTest {

    @Test
    public void test() {
        Queue<Integer> q = ImmutableQueue.getEmptyQueue();
        q = q.enQueue(10);
        print(q);
        q = q.enQueue(20);
        print(q);
        q = q.enQueue(30);
        print(q);
        q = q.enQueue(null);
        print(q);
        q = q.enQueue(40);
        print(q);
    }

    @Test
    public void head() {
        Queue<Integer> q = ImmutableQueue.getEmptyQueue();
        q = q.enQueue(10);
        q = q.enQueue(20);

        assertTrue(q.head() == 10);
        q = q.deQueue();
        assertTrue(q.head() == 20);
    }

    @Test
    public void enQueue() {
        Queue<Integer> q1 = ImmutableQueue.getEmptyQueue();
        Queue<Integer> q2 = q1.enQueue(10);
        assertTrue(q1.hashCode() != q2.hashCode());
    }

    @Test
    public void deQueue() {
        Queue<Integer> q1 = ImmutableQueue.getEmptyQueue();
        Queue<Integer> q2 = q1.enQueue(10);
    }

    private static void print(Queue<Integer> q) {
        while (q != null && !q.isEmpty()) {
            System.out.print(q.head() + " -> ");
            q = q.deQueue();
        }
        System.out.println();
    }
}