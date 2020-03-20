package immutable;

/**
 * Represents the interface for an Immutable Stack (First-In-First-Out)
 *
 * @param <T> generic type for the elements of the stack
 */
public interface Stack<T> {
    /**
     * @param t generic type for the elements of the stack
     * @return the new stack
     */
    public Stack<T> push(T t);

    /**
     * @return the new stack after removing the element from the end of the stack
     */
    public Stack<T> pop();

    /**
     * @return the head element of the stack
     */
    public T head();

    /**
     * @return true when stack is empty, false otherwise
     */
    public boolean isEmpty();
}
