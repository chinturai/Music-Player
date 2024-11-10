// Music Player functionality with queue

// Song class
class Song {
    constructor(title, file, cover) {
      this.title = title;
      this.file = file;
      this.cover = cover;
    }
  }
  
  // Queue class (FIFO)
  class Queue {
    constructor() {
      this.items = [];
    }
  
    // Add to queue
    enqueue(item) {
      this.items.push(item);
    }
  
    // Remove from queue
    dequeue() {
      if (this.isEmpty()) return "Queue is empty";
      return this.items.shift();
    }
  
    // Peek the next item
    front() {
      if (this.isEmpty()) return "Queue is empty";
      return this.items[0];
    }
  
    // Check if queue is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Get all items
    getItems() {
      return this.items;
    }
  }
  
  // Music player logic
  const playlistQueue = new Queue();
  
  const audioElement = document.getElementById('audio');
  const playPauseButton = document.getElementById('play-pause');
  const nextButton = document.getElementById('next');
  const songTitleElement = document.getElementById('song-title');
  const coverElement = document.getElementById('cover');
  const playlistElement = document.getElementById('playlist');
  const songInput = document.getElementById('song-input');
  const addSongButton = document.getElementById('add-song');
  
  // Songs stored locally in a folder called 'music'
  const songs = [
    new Song('You are my Soniya - By Sonu Nigam ', 'music/song1.mp3', 'music/cover1.jpg'),
    new Song('G.O.A.T - By Diljit Dosanjh', 'music/song2.mp3', 'music/cover2.jpg'),
    new Song('Salam-e-Ishq - By Adnan Sami ', 'music/song3.mp3', 'music/cover3.jpg')
  ];
  
  // Helper function to load and play song
  function loadAndPlaySong(song) {
    songTitleElement.textContent = song.title;
    audioElement.src = song.file;
    coverElement.src = song.cover;
    audioElement.play();
    playPauseButton.textContent = 'Pause';
  }
  
  // Play the next song in the queue
  function playNextSong() {
    if (!playlistQueue.isEmpty()) {
      const nextSong = playlistQueue.dequeue();
      loadAndPlaySong(nextSong);
      updatePlaylist();
    }
  }
  
  // Add song to playlist and UI
  function addSongToPlaylist(song) {
    playlistQueue.enqueue(song);
    updatePlaylist();
  }
  
  // Update the playlist display
  function updatePlaylist() {
    playlistElement.innerHTML = '';
    playlistQueue.getItems().forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `${song.title}`;
      playlistElement.appendChild(li);
    });
  }
  
  // Event listeners
  playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
      audioElement.play();
      playPauseButton.textContent = 'Pause';
    } else {
      audioElement.pause();
      playPauseButton.textContent = 'Play';
    }
  });
  
  nextButton.addEventListener('click', () => {
    playNextSong();
  });
  
  addSongButton.addEventListener('click', () => {
    const songName = songInput.value;
    if (songName) {
      const newSong = new Song(songName, `music/${songName}.mp3`, `music/${songName}.jpg`);
      addSongToPlaylist(newSong);
      songInput.value = '';
    }
  });
  
  // Load initial songs into the playlist when the page loads
  window.addEventListener('load', () => {
    songs.forEach(song => addSongToPlaylist(song));
    if (!playlistQueue.isEmpty()) {
      loadAndPlaySong(playlistQueue.front());
    }
  });
  