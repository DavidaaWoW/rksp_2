package Second;

import java.util.concurrent.Callable;

public class SquareCalculator implements Callable {
    private int value;

    public SquareCalculator(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public Object call() throws Exception {
        int delay = (int)(Math.random()*((5-1)+1))+1;
        for (int i = 0; i< delay; i++){
            System.out.println("Ваш запрос на вычисление квадрата числа " + value + " выполняется. Осталось " + (delay-i) + " секунд");
            Thread.sleep(1000);
        }
        return value*value;
    }
}
