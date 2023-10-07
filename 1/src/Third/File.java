package Third;

public class File {
    private String type;
    private int length;

    public File(String type, int length) {
        this.type = type;
        this.length = length;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    @Override
    public String toString() {
        return "File{" +
                "type='" + type + '\'' +
                ", length=" + length +
                '}';
    }
}
