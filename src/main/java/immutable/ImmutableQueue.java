package immutable;

import java.util.NoSuchElementException;

public class ImmutableQueue<T> implements Queue<T> {
    private final Stack<T> backwards;
    private final Stack<T> forwards;

    private ImmutableQueue(Stack<T> forwards, Stack<T> backwards) {
        this.forwards = forwards;
        this.backwards = backwards;
    }

    @Override
    public final Queue<T> enQueue(T t) {
        return new ImmutableQueue<T>(forwards, backwards.push(t));
    }

    @Override
    public final Queue<T> deQueue() {
        Stack<T> f = forwards.pop();
        if (!f.isEmpty()) {
            return new ImmutableQueue<T>(f, backwards);
        } else if (backwards.isEmpty()) {
            return EmptyQueue.getInstance();
        } else {
            return new ImmutableQueue<T>(ImmutableQueue.reverseStack(backwards), ImmutableStack.getEmptyStack());
        }
    }

    @Override
    public final T head() {
        return forwards.head();
    }

    @Override
    public final boolean isEmpty() {
        return false;
    }

    /**
     * Reverses the provided stack.
     *
     * @param stack
     * @return reversed stack
     */
    public static final Stack reverseStack(Stack stack) {
        Stack r = ImmutableStack.getEmptyStack();
        while (!stack.isEmpty()) {
            r = r.push(stack.head());
            stack = stack.pop();
        }
        return r;
    }

    /**
     * gets the empty queue.
     *
     * @return empty queue
     */
    public static final Queue getEmptyQueue() {
        return EmptyQueue.getInstance();
    }

    /**
     * Represents an empty queue implements Singleton pattern.
     *
     * @param <T>
     */
    private static final class EmptyQueue<T> implements Queue<T> {
        private final static EmptyQueue emptyQueue = new EmptyQueue();

        private final static EmptyQueue getInstance() {
            return emptyQueue;
        }

        @Override
        public final Queue<T> enQueue(T t) {
            return new ImmutableQueue<T>(ImmutableStack.getEmptyStack().push(t), ImmutableStack.getEmptyStack());
        }

        @Override
        public final Queue<T> deQueue() {
            throw new NoSuchElementException("Queue is empty");
        }

        @Override
        public final T head() {
            throw new NoSuchElementException("Queue is empty");
        }

        @Override
        public final boolean isEmpty() {
            return true;
        }
    }
}
