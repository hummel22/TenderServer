package TenderServer.resources;

import javax.persistence.*;

/**
 * Created by MBAIR on 7/27/17.
 */

@Entity
@Table(name = "tags_entries")
public class TagEntry {


  /**
   * Entity's unique identifier.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private long tag_entry_id;


  @Column(name = "tag_id")
  private long tag_id;


  @Column(name = "entry_id")
  private long entry_id;



}
