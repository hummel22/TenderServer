package TenderServer.resources;

import com.google.common.base.Optional;

import javax.persistence.Column;
import javax.ws.rs.NotFoundException;


/**
 * Created by MBAIR on 7/25/17.
 */
public class TransactionEntryFactory {

  private String name;
  private Float value;
  private long transaction_id;

  public TransactionEntryFactory() {
  }

  public TransactionEntryFactory(String name, Float value, long transaction_id) {
    this.name = name;
    this.value = value;
    this.transaction_id = transaction_id;
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

  public TransactionEntry buildEntry(TransactionDAO transactionDAO)  {
    Optional<Transaction> transaction = transactionDAO.findById(transaction_id);
    if(transaction.isPresent()) {
      transaction.get().log();
      return new TransactionEntry(name, value, transaction.get());
    } else  {
      throw new NotFoundException("Count Not Find Transtion: " + Long.toString(transaction_id));
    }
  }
}
