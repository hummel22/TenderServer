package TenderServer.resources;


import javax.persistence.*;
import java.util.Date;

/**
 * Created by MBAIR on 7/24/17.
 */
@Entity
@Table(name = "transactions")
@NamedQueries({
        @NamedQuery(name = "com.olledeux.Transaction.findAll",
                query = "select e from Transaction e"),
        @NamedQuery(name = "com.olledeux.Transaction.findByName",
                query = "select e from Transaction e "
                        + "where e.name like :name "
                       )
})
public class Transaction {
  /**
   * Entity's unique identifier.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "transaction_id")
  private long transactionId;


  /**
   * employee first name.
   */
  @Column(name = "name")
  private String name;

  /**
   * employee last name.
   */
  @Column(name = "date")
  private Date date;

  public Transaction() {};
  public Transaction(String name, Date date)  {
    this.name = name;
    this.date = date;
  }

  public void log()  {
    System.out.println("Name " + name);
    System.out.println("Date: " + date.toString());
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Transaction that = (Transaction) o;

    return transactionId == that.transactionId;

  }

  @Override
  public int hashCode() {
    return (int) (transactionId ^ (transactionId >>> 32));
  }

  public long getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(long transactionId) {
    this.transactionId = transactionId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

}
