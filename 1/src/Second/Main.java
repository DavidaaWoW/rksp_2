package Second;

import java.util.Scanner;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newCachedThreadPool();
        while (true) {
            Scanner reader = new Scanner(System.in);
            int digit = reader.nextInt();
            SquareCalculator squareCalculator = new SquareCalculator(digit);


            CompletableFuture<Object> future = CompletableFuture.supplyAsync(() -> {
                try {
                    return squareCalculator.call();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });

            // Обрабатываем результат, когда он готов
            future.thenAccept(result -> {
                System.out.println("Квадрат " + digit + " равен " + result);
            });

//            FutureTask<Integer> squareTask = new FutureTask<Integer>(squareCalculator);
//            Executor executor = (Runnable runnable) -> {
//                new Thread(runnable).start();
//            };
//            executor.execute(squareTask);
//            executorService.submit(squareTask);
//            if (squareTask.isDone())
//                System.out.println("Квадрат " + digit + " равен " + squareTask.get());
        }
    }
}
