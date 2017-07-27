package TenderServer.resources;

import com.google.common.base.Optional;

import javax.persistence.Column;
import javax.ws.rs.NotFoundException;
import java.util.Date;
import java.util.Set;

/**
 * Created by MBAIR on 7/27/17.
 */
public class TransactionFactory {
  private String name;
  private Date date;
  Location location;

  public void log() {
    System.out.println("Name: " + name);
    System.out.println("Date: " + date.toString());
    location.log();
  }

  public TransactionFactory() {

  }

  public TransactionFactory(String name, Date date, Location location) {
    this.name = name;
    this.date = date;
    this.location = location;
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

  public Location getLocation() {
    return location;
  }

  public void setLocation(Location location) {
    this.location = location;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    TransactionFactory that = (TransactionFactory) o;

    if (name != null ? !name.equals(that.name) : that.name != null) return false;
    if (date != null ? !date.equals(that.date) : that.date != null) return false;
    return location != null ? location.equals(that.location) : that.location == null;

  }

  @Override
  public int hashCode() {
    int result = name != null ? name.hashCode() : 0;
    result = 31 * result + (date != null ? date.hashCode() : 0);
    result = 31 * result + (location != null ? location.hashCode() : 0);
    return result;
  }


  public Transaction buildTransaction(LocationDAO locationDAO)  {
    Optional<Location> locationOpt = locationDAO.getLocationByNickName(this.location.getNickname());
    if(locationOpt.isPresent()) {
      return new Transaction(name, date, locationOpt.get());
    } else  {
      locationDAO.saveOrUpdate(location);
      return new Transaction(name, date, location);
    }
  }
}
