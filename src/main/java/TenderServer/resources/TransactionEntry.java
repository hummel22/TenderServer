package TenderServer.resources;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

/**
 * Created by MBAIR on 7/25/17.
 */

@Entity
@Table(name = "entries")
@NamedQueries({
        @NamedQuery(name = "com.olledeux.TransactionEntry.findAll",
                query = "select e from TransactionEntry e"),
        @NamedQuery(name = "com.olledeux.TransactionEntry.findByName",
                query = "select e from TransactionEntry e "
                        + "where e.name like :name "
        )
})
public class TransactionEntry {
  /**
   * Entity's unique identifier.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "entry_id")
  private long entry_id;


  /**
   * employee first name.
   */
  @Column(name = "name")
  private String name;


  /**
   * Value
   */
  @Column(name = "value")
  private Float value;


  /**
   *
   */
  @ManyToOne
  @JoinColumn(name="transaction_id", nullable=false)
  private Transaction transaction;


  public void log()  {
    System.out.println("Name " + name);
    System.out.println("Value: " + value.toString());
    System.out.println("Transaction : " + transaction.getName());
  }


  public TransactionEntry(String name, Float value, Transaction transaction, Set<Tag> tags) {
    this.name = name;
    this.value = value;
    this.transaction = transaction;
    this.tags = tags;
  }

  public TransactionEntry() {
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    TransactionEntry that = (TransactionEntry) o;

    return entry_id == that.entry_id;

  }

  @Override
  public int hashCode() {
    return (int) (entry_id ^ (entry_id >>> 32));
  }

  public long getEntry_id() {
    return entry_id;
  }

  public void setEntry_id(long entry_id) {
    this.entry_id = entry_id;
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

  public void setTransaction(Transaction transaction) {
    this.transaction = transaction;
  }

  public long getTransactionId()  {
    return this.transaction.getTransactionId();
  }


  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "tags_entries", joinColumns = { @JoinColumn(name = "entry_id") }, inverseJoinColumns = { @JoinColumn(name = "tag_id") })
  private Set<Tag> tags;
  public ArrayList<String> getTags() {
    ArrayList<String> tags = new ArrayList<String>();
    if(this.tags != null) {
      for (Tag tag : this.tags) {
        tags.add(tag.getName());
      }
    }
    return tags;
  }

  public void setTags(Set<Tag> tags) {
    this.tags = tags;
  }
}
