import { PureComponent } from "react";

export class PaginationHelper extends PureComponent {
  limit: number;
  offset: number;
  total: number;

  constructor(props) {
    super(props);
    this.limit = typeof props.limit === "number" ? props.limit : 0;
    this.offset = typeof props.offset === "number" ? props.offset : 0;
    this.total = typeof props.total === "number" ? props.total : null;
    if (typeof props.page === "number") {
      this.setPage(props.page);
    }
  }

  getClosestPage(page) {
    let closest = page;
    if (typeof page !== "number") {
      closest = Number(page);
    }
    if (!Number.isNaN(closest)) {
      const count = this.getPageCount();
      if (page > count) {
        closest = count;
      } else if (closest < 1) {
        closest = 1;
      }
    }
    return closest;
  }

  equal(pagination) {
    return (
      this.getLimit() === pagination.getLimit() &&
      this.getOffset() === pagination.getOffset() &&
      this.getTotal() === pagination.getTotal()
    );
  }

  getLastPage() {
    return this.getPageCount();
  }

  getLimit() {
    return this.limit;
  }

  getNextPage() {
    return this.getPage() < this.getPageCount() ? this.getPage() + 1 : this.getLastPage();
  }

  getOffset() {
    return this.offset;
  }

  getOffsetFromPage(page) {
    return this.limit * (page - 1);
  }

  getPage() {
    return this.getPageFromOffset(this.offset);
  }

  getPageCount() {
    return this.total > 0 && this.limit > 0 ? Math.ceil(this.total / this.limit) : 1;
  }

  getPageFromOffset(offset) {
    return offset > 0 && this.limit > 0 ? Math.round(offset / this.limit) + 1 : 1;
  }

  getPreviousPage() {
    return Math.max(1, this.getPage() - 1);
  }

  getTotal() {
    return this.total;
  }

  hasNext() {
    return this.getPage() < this.getNextPage();
  }

  hasPrevious() {
    return this.getPage() > this.getPreviousPage();
  }

  isPageValid(page) {
    return typeof page === "number" && !Number.isNaN(page) && page > 0 && page <= this.getPageCount();
  }

  next() {
    if (this.hasNext()) {
      this.offset += this.limit;
    }
    return this;
  }

  previous() {
    if (this.hasPrevious()) {
      this.offset -= this.limit;
    } else {
      this.offset = 0;
    }
    return this;
  }

  setLimit(limit: number) {
    if (!Number.isNaN(limit)) {
      this.limit = Math.max(0, Math.round(limit));
    }
    return this;
  }

  setOffset(offset: number) {
    if (!Number.isNaN(offset)) {
      this.offset = Math.max(0, Math.round(offset));
    }
    return this;
  }

  setPage(page: number) {
    if (!Number.isNaN(page)) {
      this.setOffset(this.getOffsetFromPage(page));
    }
    return this;
  }

  setTotal(total: number) {
    if (!Number.isNaN(total)) {
      this.total = Math.max(0, Math.round(total));
    }
    return this;
  }
}
