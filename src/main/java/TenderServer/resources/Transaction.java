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
  @Column(name = "id")
  private long id;


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



  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Transaction that = (Transaction) o;

    return id == that.id;

  }

  @Override
  public int hashCode() {
    return (int) (id ^ (id >>> 32));
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
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
