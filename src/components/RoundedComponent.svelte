<script>
    export let imageUrl = "";
</script>

<div
    class="container bg-gray-200 p-4 rounded-lg flex items-center justify-center"
>
    <div class="square mr-2">
        <img src={imageUrl} alt="square-image" class="h-16 w-16 object-cover" />
    </div>
    <div class="square bg-red-500 h-16 w-16 mr-2" />
    <div class="square bg-green-500 h-16 w-16 mr-2" />
    <div class="square bg-blue-500 h-16 w-16" />
</div>

<style>
    .square {
        border-radius: 4px;
    }
</style>
