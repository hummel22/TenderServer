package TenderServer.resources;

import java.util.List;

/**
 * Created by MBAIR on 7/25/17.
 */
public class TagCollection {
  private List<Tag> tags;

  public TagCollection() {
  }

  public TagCollection(List<Tag> tags) {
    this.tags = tags;
  }

  public List<Tag> getTags() {
    return tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    TagCollection that = (TagCollection) o;

    return tags != null ? tags.equals(that.tags) : that.tags == null;

  }

  @Override
  public int hashCode() {
    return tags != null ? tags.hashCode() : 0;
  }
}
