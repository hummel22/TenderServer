package TenderServer.resources;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by MBAIR on 7/25/17.
 */

@Entity
@Table(name = "entries")
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
  private long transaction_id;


}
