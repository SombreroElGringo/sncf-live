import React from 'react';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import { fetchAuthors, resetAuthors } from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getAuthors from '../../redux/selectors/app/getAuthors';
import '../SearchBook/SearchBook.css';

class BookcaseSearchAuthor extends React.Component {
  handleOnclick = event => {
    event.preventDefault();

    const { access, authors, resetAuthors } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    const formData = new FormData(this.refs.form);
    const name = formData.get('authorname');
    console.log(name)
    resetAuthors();

    const wantedBook = authors.filter(author => author.name === name);

    // pass the author._id
  };

  handleAutocomplete = event => {
    const {authors, fetchAuthors,resetAuthors } = this.props;
    const value = event.target.value;
    this.timer = null;
    //resetAuthors()
    console.log(authors)
    if (this.timer) clearTimeout(this.timer);
    this.time = setTimeout(() => {
      fetchAuthors(value, true);
    }, 500);
  };

  // TODO Improve CSS
  render() {
    const { authors } = this.props;
    console.log("A", authors)
    return (
      <div className="search-book">
          <div className="d-flex">
            <Search
              name="authorname"
              ref={ ref => {
                this.authorname = ref;
              }}
              results={
                authors &&
                authors.map(a => ({
                  title: a.name,
                  description: a.authorCode
                }))
              }
              selectFirstResult={true}
              className={'flex-1 autocomplete'}
              onSearchChange={this.handleAutocomplete}
            />
            <button
              className="btn btn-info ml-2"
              onClick={this.handleOnclick}
              disabled={authors === undefined}
            >
              {authors === undefined ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                "Ajouter l'auteur"
              )}
            </button>
          </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
    authors: getAuthors,
  }),
  mapDispatchToProps({
    fetchAuthors,
    resetAuthors,
  })
)(BookcaseSearchAuthor);
