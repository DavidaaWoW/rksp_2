package Third;

import java.util.*;
import java.util.concurrent.Callable;

public class Queue implements Callable{
    private Deque<File> files;

    public Queue() {
        this.files = new ArrayDeque<>();
    }

    public void addFile(File file) {
        this.files.add(file);
    }


    public void removeFile(File file){
        this.files.remove(file);
    }

    @Override
    public Object call() throws Exception {
        File file = files.element();
        this.removeFile(file);
        return file;
    }
}
