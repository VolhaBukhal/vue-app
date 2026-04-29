<script setup>
import { ref, onMounted, watch } from 'vue'

const TAGS = ['react', 'vuejs', 'javascript', 'angular', 'sql', 'js-pattern']

const books = ref([{ title: 'book1' }, { title: 'book2' }, { title: 'book3' }])
const selectedBook = ref(null)
const selectedTag = ref('javascript')
const loading = ref(false)
const error = ref(null)
const loadingDetails = ref(null)

console.log('selectedBook, selectedTag>>>', selectedBook, selectedTag)

const fetchBooks = async (topic) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${topic}`)
    const data = await res.json()
    books.value = data.docs.slice(0, 10)
    console.log('data.docs', data.docs)
  } catch (e) {
    error.value = 'Book loading error'
  } finally {
    loading.value = false
  }
}

const fetchBookDetails = async (bookKey) => {
  console.log('bookKey>>', bookKey)
  loadingDetails.value = true

  try {
    const res = await fetch(`https://openlibrary.org${bookKey}.json`)
    const data = await res.json()
    selectedBook.value = data
  } catch (e) {
    error.value = 'Book details loading error'
  } finally {
    loadingDetails.value = false
  }
}

const setTag = (tag) => {
  console.log('tag>>', tag)
  selectedTag.value = tag
}

onMounted(() => {
  fetchBooks(selectedTag.value)
})

watch(selectedTag, () => {
  fetchBooks(selectedTag.value)
})
</script>

<template>
  <div class="books-wrapper">
    <h1>📚 Books</h1>
    <div class="tags">
      <div v-for="tag in TAGS" :key="tag">
        <div class="tag-item" :class="{ selected: selectedTag === tag }" @click="setTag(tag)">
          {{ tag }}
        </div>
      </div>
    </div>

    <p v-if="loading">Загрузка...</p>

    <p v-if="error">{{ error }}</p>

    <ul v-if="!loading">
      <li v-for="book in books" :key="book.key" class="row">
        <span>{{ book.title }}</span>

        <button @click="fetchBookDetails(book.key)">More</button>
      </li>
    </ul>

    <hr />

    <div v-if="selectedBook" class="details">
      <h2>📖 Details</h2>

      <p v-if="loadingDetails">Details loading...</p>

      <div v-else>
        <h3>{{ selectedBook.title }}</h3>

        <p>
          {{
            typeof selectedBook.description === 'string'
              ? selectedBook.description
              : selectedBook.description?.value
          }}
        </p>

        <button @click="selectedBook = null">Close</button>
      </div>
    </div>
  </div>
</template>

<style>
.books-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;

  border-radius: 10px;
  font-size: 18px;
}
.btn {
  padding: 2px 4px;
  cursor: pointer;
}
.row {
  display: flex;
  gap: 20px;
  margin-bottom: 4px;
}
.tags {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.tag-item {
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: #a8b6b2;
  cursor: pointer;
}

.tag-item:hover {
  background-color: #bad3cc;
}

.tag-item.selected {
  background-color: #498272;
  color: white;
}

.details {
  height: 70vh;
}
</style>
