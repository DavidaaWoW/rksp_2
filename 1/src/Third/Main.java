package Third;

import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        Queue queue = new Queue();
        while (true){
            FileGenerator generator = new FileGenerator();
            CompletableFuture<Object> fileGenerator = CompletableFuture.supplyAsync(() -> {
                try {
                    return generator.call();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            fileGenerator.thenAccept(result -> {
                queue.addFile((File) result);
            });
            CompletableFuture<Object> fileProcessor = CompletableFuture.supplyAsync(() -> {
                try {
                    return queue.call();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            fileProcessor.thenApply((file) -> {
                FileProcessor processor = new FileProcessor((File) file);
                try {
                    return processor.call();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }).thenAccept(System.out::println);
        }
    }

}
