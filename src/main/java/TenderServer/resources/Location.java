package TenderServer.resources;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by MBAIR on 7/27/17.
 */

@Entity
@Table(name = "locations")
@NamedQueries({
        @NamedQuery(name = "com.olledeux.Location.findAll",
                query = "select e from Location e"),
        @NamedQuery(name = "com.olledeux.Location.findByName",
                query = "select e from Location e "
                        + "where e.name like :name "),
        @NamedQuery(name = "com.olledeux.Location.findByNickName",
                query = "select e from Location e "
                        + "where e.nickname like :nickname ")
})
public class Location {
  /**
   * Entity's unique identifier.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "location_id")
  private long location_id;


  /**
   * Tag name.
   */
  @Column(name = "name")
  private String name;

  /**
   * Tag name.
   */
  @Column(name = "town")
  private String town;

  /**
   * Tag name.
   */
  @Column(name = "nickname")
  private String nickname;



  @OneToMany(mappedBy="location")
  private Set<Transaction> transactions;


  public void log()  {
   System.out.println("Location" + getName() + "-" + getTown() + "-" + getNickname());
  }


  public Location() {
  }

  public Location(String name, String town, String nickname) {
    this.name = name;
    this.town = town;
    this.nickname = nickname;
  }

  public long getLocation_id() {
    return location_id;
  }

  public void setLocation_id(long location_id) {
    this.location_id = location_id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTown() {
    return town;
  }

  public void setTown(String town) {
    this.town = town;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }


  public void setTransactions(Set<Transaction> transactions) {
    this.transactions = transactions;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Location location = (Location) o;

    return nickname.equals(location.nickname);

  }

  @Override
  public int hashCode() {
    return nickname.hashCode();
  }
}
