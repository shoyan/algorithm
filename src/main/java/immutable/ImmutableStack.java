package immutable;

import java.util.NoSuchElementException;

public class ImmutableStack<T> implements Stack<T> {
    private final T head;
    private final Stack<T> tail;

    private ImmutableStack(T head, Stack<T> tail) {
        this.head = head;
        this.tail = tail;
    }

    @Override
    public final Stack<T> push(T t) {
        return new ImmutableStack<T>(t, this);
    }

    @Override
    public final Stack<T> pop() {
        return tail;
    }

    @Override
    public final T head() {
        return head;
    }

    @Override
    public final boolean isEmpty() {
        return false;
    }

    /**
     * gets the empty stack.
     *
     * @return empty stack
     */
    public final static Stack getEmptyStack() {
        return EmptyStack.getInstance();
    }

    /**
     * Represents an empty stack implements Singleton pattern.
     *
     * @param <T>
     */
    private static final class EmptyStack<T> implements Stack<T> {
        private static final EmptyStack emptyStack = new EmptyStack();

        public static final EmptyStack getInstance() {
            return emptyStack;
        }

        public final Stack<T> push(T t) {
            return new ImmutableStack<T>(t, this);
        }

        public final Stack<T> pop() {
            throw new NoSuchElementException("Stack is empty");
        }

        public final T head() {
            throw new NoSuchElementException("Stack is empty");
        }

        public final boolean isEmpty() {
            return true;
        }
    }
}
