import weka.core.Instances;
import java.io.BufferedReader;
import java.io.FileReader;
BufferedReader reader = new BufferedReader(
                            new FileReader("/train75cor.arff"));
Instances data = new Instances(reader);
reader.close();
// setting class attribute
data.setClassIndex(data.numAttributes() - 1);