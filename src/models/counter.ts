import mongoose,{Document,Schema} from "mongoose";

interface ICounter extends Document {
  counterName: string;
  count: number;
}

const counterSchema = new Schema<ICounter>({
  counterName: { type: String, required: true },
  count: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", counterSchema, "Counters");
export async function getNextSequence(counterName: string): Promise<number> {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { counterName: counterName },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument ? sequenceDocument.count : 0;
}
export default Counter;
