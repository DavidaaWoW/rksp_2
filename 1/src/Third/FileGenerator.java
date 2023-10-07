package Third;

import java.util.concurrent.Callable;

public class FileGenerator implements Callable {
    String filetype;
    int size;

    public FileGenerator() {
        int type = (int)(Math.random() * ((3 - 1) + 1)) + 1;
        switch (type){
            case 1:
                this.filetype = "JSON";
                break;
            case 2:
                this.filetype = "XML";
                break;
            case 3:
                this.filetype = "RSL";
                break;
            default:
                this.filetype = "";
                break;
        }

        this.size = (int)(Math.random() * ((100 - 10) + 1)) + 10;
    }

    @Override
    public File call() throws Exception {
        int delay = (int)(Math.random() * ((300 - 100) + 1)) + 100;
        Thread.sleep(delay);
        return new File(this.filetype, this.size);
    }
}
