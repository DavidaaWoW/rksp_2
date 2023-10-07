package First;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    private List<Integer> generateElementsArray(int size, int min, int max){
        List<Integer> arr = new ArrayList<>();
        for(int i = 0; i<size; i++){
            int number = (int)(Math.random()*((max-min)+1))+min;
            arr.add(number);
        }
        return arr;
    }

    private void timeMessageOut(long startTime, long endTime, String method){
        System.out.println(method + " сумма массива посчитана за " + ((endTime-startTime)) + " миллисек.");
    }

    private int getArraySumSequentially(List<Integer> arr) throws InterruptedException {
        int sum = 0;
        long startTime = System.currentTimeMillis();
        for (int el: arr
             ) {
            sum+=el;
            Thread.sleep(1);
        }
        long endTime = System.currentTimeMillis();
        timeMessageOut(startTime, endTime, "Последовательно");
        return sum;
    }

    private long getArrayWithThread(List<Integer> arr){
        ThreadCalculator calculator = new ThreadCalculator(arr);
        long startTime = System.currentTimeMillis();
        calculator.run();
        long endTime = System.currentTimeMillis();
        timeMessageOut(startTime, endTime, "С использованием потоков");
        return calculator.getPartialSum();
    }

    private long getArrayWithForkJoin(List<Integer> arr){
        Object lock = new Object();
        ExecutorService executorService = Executors.newCachedThreadPool();
        ThreadCalculator calculator = new ThreadCalculator(arr);
        long startTime = System.currentTimeMillis();
        for (int i = 0; i<5; i++){
            executorService.submit(calculator);
        }
        executorService.shutdown();
        long endTime = System.currentTimeMillis();
        timeMessageOut(startTime, endTime, "С использованием fork/join");
        return calculator.getPartialSum();
    }

    public static void main(String[] args) throws InterruptedException {
        Main main = new Main();
        List<Integer> arr = main.generateElementsArray(1000, 0, 10);
        main.getArraySumSequentially(arr);
        main.getArrayWithThread(arr);
        main.getArrayWithForkJoin(arr);
    }
}
