package Third;

import java.util.concurrent.Callable;

public class FileProcessor implements Callable {
    private int processingTime;
    private File file;

    public FileProcessor(File file) {
        this.file = file;
        this.processingTime = file.getLength()*7;
    }
    @Override
    public Object call() throws Exception {
        Thread.sleep(this.processingTime);
        return "File processed" + file.toString();
    }
}
