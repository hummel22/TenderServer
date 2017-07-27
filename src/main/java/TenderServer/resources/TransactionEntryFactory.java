package TenderServer.resources;

import com.google.common.base.Optional;

import javax.persistence.Column;
import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.Set;


/**
 * Created by MBAIR on 7/25/17.
 */
public class TransactionEntryFactory {

  private String name;
  private Float value;
  private long transaction_id;
  private ArrayList<String> tags;

  public TransactionEntryFactory() {
  }

  public TransactionEntryFactory(String name, Float value, long transaction_id, ArrayList<String> tags) {
    this.name = name;
    this.value = value;
    this.transaction_id = transaction_id;
    this.tags = tags;
  }

  public ArrayList<String> getTags() {
    return tags;
  }

  public void setTags(ArrayList<String> tags) {
    this.tags = tags;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Float getValue() {
    return value;
  }

  public void setValue(Float value) {
    this.value = value;
  }

  public long getTransaction_id() {
    return transaction_id;
  }

  public void setTransaction_id(long transaction_id) {
    this.transaction_id = transaction_id;
  }

  public TransactionEntry buildEntry(TransactionDAO transactionDAO, TagDAO tagDAO)  {
    Optional<Transaction> transaction = transactionDAO.findById(transaction_id);
    Set<Tag> tagSet = tagDAO.stringsToTags(tags);
    if(transaction.isPresent()) {
      transaction.get().log();
      return new TransactionEntry(name, value, transaction.get(), tagSet);
    } else  {
      throw new NotFoundException("Count Not Find Transaction: " + Long.toString(transaction_id));
    }
  }
}
