package TenderServer.resources;

import javax.persistence.*;

/**
 * Created by MBAIR on 7/25/17.
 */

@Entity
@Table(name = "tags")
@NamedQueries({
        @NamedQuery(name = "com.olledeux.Tag.findAll",
                query = "select e from Tag e"),
        @NamedQuery(name = "com.olledeux.Tag.findByName",
                query = "select e from Tag e "
                        + "where e.name like :name "
        )
})
public class Tag {

  /**
   * Entity's unique identifier.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "tag_id")
  private long tag_id;


  /**
   * Tag name.
   */
  @Column(name = "name")
  private String name;

  public Tag() {
  }

  public Tag(String name) {
    this.name = name;
  }

  public long getTag_id() {
    return tag_id;
  }

  public void setTag_id(long tag_id) {
    this.tag_id = tag_id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Tag tag = (Tag) o;

    return name != null ? name.equals(tag.name) : tag.name == null;

  }

  @Override
  public int hashCode() {
    return name != null ? name.hashCode() : 0;
  }
}
