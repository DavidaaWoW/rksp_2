package First;
import java.util.List;

public class ThreadCalculator extends Thread{
    private List<Integer> array;
    private long partialSum;

    public ThreadCalculator(List<Integer> array) {
        this.array = array;
    }

    public long getPartialSum() {
        return partialSum;
    }

    @Override
    public void run() {
        partialSum = 0;
        for (int i:
             array) {
            partialSum += i;
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
